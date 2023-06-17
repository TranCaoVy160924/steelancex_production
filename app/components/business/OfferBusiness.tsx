'use client'

import Image from "next/image";
import { useState } from "react";
import { useTranslation } from "react-i18next";

interface OfferBusinessProps {
    src: string;
    title?: string;
    offer?: {
        comment: string;
        price: number;
        date: number;
    }[];
    showButton?: boolean; // Thêm prop showButton để kiểm soát việc hiển thị nút button
}

const OfferBusiness: React.FC<OfferBusinessProps> = ({
    src,
    title,
    offer,
    showButton = false, // Giá trị mặc định cho showButton là false
}) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const { t } = useTranslation()

    const handleShowMore = () => {
        setIsExpanded(true);
    };

    const handleShowLess = () => {
        setIsExpanded(false);
    };

    return (
        <>
            <div className="grid grid-cols-12 py-5 space-x-5">
                <div className="col-span-2">
                    <Image
                        alt="avatar"
                        src={src}
                        width="150"
                        height="150"
                        className="cursor-pointer"
                    />
                </div>
                {offer?.map((item) => (
                    <>
                        <section className="col-span-6 space-y-5">
                            <h1 className="font-bold">{title}</h1>
                            <p className={isExpanded ? "" : "line-clamp-6"}>{item.comment}</p>
                            {!isExpanded && (
                                <button onClick={handleShowMore} className="text-pink-cus-tx">
                                    {t("Show More")}
                                </button>
                            )}
                            {isExpanded && (
                                <button onClick={handleShowLess} className="text-pink-cus-tx">
                                    {t("Show Less")}
                                </button>
                            )}
                        </section>
                        <div className="col-span-4 text-center">
                            <h2 className="font-bold text-pink-cus-bt">
                                {item.price}$
                                <span className="text-black font-medium"> {t("in")} {item.date} {t("Date")}</span>
                            </h2>
                        </div>
                    </>
                ))}
                {showButton && ( // Kiểm tra nếu showButton là true thì hiển thị nút button
                    <div className="col-span-12 flex justify-end">
                        <button className="text-pink-cus-tx hover:underline">{t("Choose")}</button>
                    </div>
                )}
            </div>
            <div className="border-b-2"></div>
        </>
    );
};

export default OfferBusiness;
