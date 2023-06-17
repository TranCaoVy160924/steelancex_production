import usePaymentModal from '@/hooks/usePaymentModal';
import CustomModal from './Modal';
import Input from './Input';
import {
    FieldValues,
    SubmitHandler,
    useForm
} from "react-hook-form";
import { useTranslation } from "react-i18next"

const ModalPayment = () => {
    const paymentModal = usePaymentModal();
    const { t } = useTranslation()

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FieldValues>({
        defaultValues: {
            email: '',
            phone: '',
        }
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        console.log(data);
    };

    return (
        <CustomModal
            isOpen={paymentModal.isOpen}
            onClose={paymentModal.onClose}
            title="Payment"
            width={"w-2/4"}
        >
            <form className="w-full px-10" onSubmit={handleSubmit(onSubmit)}>
                <Input
                    id="email"
                    label="Mail"
                    placeholder={t("Enter mail") ?? ""} 
                    register={register}
                    errors={errors}
                />
                <Input
                    id="phone"
                    label={t("Phone") ?? ""}
                    placeholder={t("Enter phone") ?? ""} 
                    register={register}
                    errors={errors}
                />
                <button type="submit" className='mt-4 text-pink-cus-tx hover:underline'>{t("Payment")}</button>
            </form>
        </CustomModal>
    );
};

export default ModalPayment;
