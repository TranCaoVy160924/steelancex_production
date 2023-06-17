'use client'

import { MyContext } from "@/app/layout"
import useEditModal from "@/hooks/useEditModal"
import useQrModal from "@/hooks/useQrModal"
import { UserInfo } from "@/services/auth"
import { useRouter } from "next/router"
import React, { useContext } from "react"
import { useTranslation } from "react-i18next"

const ButtonCus: React.FC = () => {
    const context = useContext(MyContext);
    const router = useRouter()
    const editModal = useEditModal();
    const qrModal = useQrModal();
    const { t } = useTranslation()

    const handleEditButtonClick = () => {
        if (context.currentUser.IsPremium) {
            editModal.onOpen();
        }
        else {
            qrModal.onOpen();
        }
    };
    
    return (
        <div className="relative">
            <div className="
                    flex 
                    flex-row 
                    items-center 
                    gap-3
                "
            >
                <button
                    onClick={context.currentUser.Role === "Business"? () => router.push('/post_job') : handleEditButtonClick}
                    className="
                        hidden
                        w-full
                        md:block
                        text-sm
                        py-3
                        px-4
                        bg-pink-cus-bt
                        text-white
                        font-semibold
                        rounded-full
                        transition
                        cursor-pointer
                        hover:bg-pink-600
                    "
                    style={{ width: 'fit-content' }}
                >
                    {context.currentUser.Role === "Business" ? `${t("Post a project")}` : `${t("Your freelancer profile")}`}
                </button>
            </div>
        </div>
    )
}

export default ButtonCus