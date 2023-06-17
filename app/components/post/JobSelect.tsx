'use client'

import { useEffect, useState } from 'react';
import Select from 'react-select';
import CategoryService from '../../../services/category';
import CategoryResponse from '@/models/categoryResponse';


interface JobSelectProps {
    title?: string;
    description?: string;
    name?: string;
    value?: string[];
    onChange?: any;
    setSelectedCat: any
}

const JobSelect: React.FC<JobSelectProps> = ({
    title,
    description,
    name,
    onChange
}) => {
    // const [selectedSkills, setSelectedSkills] = useState<{ value: string; label: string }[]>([]);
    const [cats, setCats] = useState<{ value: string; label: string }[]>([]);

    const handleSkillChange = (selectedOptions: any) => {
        // setSelectedSkills(selectedOptions.map(x => x.value));
        // const skills = selectedOptions ? selectedOptions.map((option: any) => option.value) : [];
        // onChange(skills);
    };

    useEffect(() => {
        CategoryService.get()
            .then(catsResponse => {
                console.log(catsResponse)
                setCats(catsResponse.value.map((c: CategoryResponse) => ({
                    value: c.Id,
                    label: c.Name
                })))
            })
    }, [])

    return (
        <>
            <label>{title}</label>
            <h2 className="text-xl font-thin">
                {description}
            </h2>
            <Select
                name={name}
                onChange={handleSkillChange}
                placeholder="..."
                options={cats}
                className="
                    w-full 
                    border-[1px] 
                    border-pink-cus-tx 
                    rounded-[5px]
                "
                isClearable
                isMulti
            />
        </>
    );
};

export default JobSelect;
