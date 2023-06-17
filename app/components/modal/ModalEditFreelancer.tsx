'use client'

import useEditModal from '@/hooks/useEditModal';
import CustomModal from './Modal';
import { useState } from 'react';
import Input from './Input';
import FreelancerResponse from '@/models/freelancerResponse';
import { useTranslation } from "react-i18next"

// interface Skill {
//     title: string;
// }

// interface Product {
//     src: string;
//     title: string;
// }

// interface ModalEditData {
//     src?: string;
//     title?: string,
//     lable?: string,
//     city?: string,
//     country?: string
//     price?: number
//     description?: string,
//     language?: string,
//     prior?: string,
//     skill?: Skill[],
//     product?: Product[]
// }

interface ModalEditProps {
    onSave: (value: FreelancerResponse) => void;
    initialData: FreelancerResponse,
    categories: string[]
}

const ModalEdit: React.FC<ModalEditProps> = ({
    onSave,
    initialData,
    categories
}) => {
    const editModal = useEditModal()
    const { t } = useTranslation()
    const [formData, setFormData] = useState(initialData);

    const handleSkillChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        const { value } = e.target;
        const skillArr = value.split(",").map((item) => ({ title: item.trim() }));
        setFormData((prevData) => ({
            ...prevData,
            skill: skillArr
        }));
    };

    // const handleProductTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     e.preventDefault()
    //     const { name, value } = e.target;
    //     const index = parseInt(name.split("-")[1]);
    //     const updatedProduct = [...formData.product || []];
    //     updatedProduct[index] = {
    //         ...updatedProduct[index],
    //         title: value
    //     };
    //     setFormData((prevData) => ({
    //         ...prevData,
    //         product: updatedProduct
    //     }));
    // };

    // const handleProductSrcChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     e.preventDefault()
    //     const { name, value } = e.target;
    //     const index = parseInt(name.split("-")[1]);
    //     const updatedProduct = [...formData.product || []];
    //     updatedProduct[index] = {
    //         ...updatedProduct[index],
    //         src: value
    //     };
    //     setFormData((prevData) => ({
    //         ...prevData,
    //         product: updatedProduct
    //     }));
    // };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };


    const handleSubmit = () => {
        onSave(formData);
    };

    return (
        <CustomModal
            isOpen={editModal.isOpen}
            onClose={editModal.onClose}
            title="Edit Profile"
            width={"w-2/4"}
            height={"h-3/4"}
        >
            <form className="w-full px-10">
                <Input
                    label="ImageURL"
                    name="src"
                    value={formData.ImageUrl}
                    onChange={handleInputChange}
                />
                <Input
                    label={t("Name") ?? ""} 
                    name="Name"
                    value={formData.Fullname}
                    onChange={handleInputChange}
                />
                <Input
                    label={t("Review") ?? ""} 
                    name="Title"
                    value={formData.Title}
                    onChange={handleInputChange}
                />
                <Input
                    label={t("Address") ?? ""} 
                    name="Address"
                    value={formData.Address}
                    onChange={handleInputChange}
                />
                {/* <Input
                    label="Country"
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                /> */}
                <Input
                    label={t("Price") ?? ""} 
                    name="price"
                    value={formData.Price}
                    onChange={handleInputChange}
                />
                <label htmlFor="description" className='block text-xl font-semibold text-left'>{t("Description")}</label>
                <textarea
                    rows={5}
                    name="description"
                    placeholder={t("Enter description") ?? ""} 
                    value={formData.Description}
                    onChange={handleTextareaChange}
                    className="
                        w-full 
                        border-[1px] 
                        border-pink-cus-tx 
                        rounded-[5px]
                        hover:border-pink-cus-bt 
                        text-xl
                    "
                ></textarea>
                {/* <Input
                    label="Language"
                    name="language"
                    value={formData.language}
                    onChange={handleInputChange}
                />
                <label htmlFor="prior" className='block text-xl font-semibold text-left'>Prior experience</label>
                <textarea
                    rows={2}
                    name="prior"
                    value={formData.prior}
                    onChange={handleTextareaChange}
                    className="
                        w-full 
                        border-[1px] 
                        border-pink-cus-tx 
                        rounded-[5px]
                        hover:border-pink-cus-bt 
                        text-xl
                    "
                ></textarea> */}
                <Input
                    label={t("Skill") ?? ""} 
                    name="skill"
                    value={categories ? categories.join(", ") : ""}
                    onChange={handleSkillChange}
                />
                {/* {formData.product &&
                    formData.product.map((item, index) => (
                        <div key={index}>
                            <Input
                                label={`Product ${index + 1} - Title`}
                                name={`product-${index}`}
                                value={item.title}
                                onChange={handleProductTitleChange}
                            />
                            <Input
                                label={`Product ${index + 1} - Src`}
                                name={`product-${index}-src`}
                                value={item.src}
                                onChange={handleProductSrcChange}
                            />
                        </div>
                    ))} */}
                <button onClick={handleSubmit} className='mt-4 text-pink-cus-tx hover:underline'>{t("Save")}</button>
            </form>
        </CustomModal>
    );
}

export default ModalEdit
