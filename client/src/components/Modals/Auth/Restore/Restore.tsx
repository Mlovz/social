import React from "react";
import "../auth.scss";

import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { Heading, Form, FormField, CheckBox, Button } from "@/common";
import { useAppDispatch, useAppSelector } from "@/hooks/useStore";
import { setAuthModal } from "@/redux/features/auth/AuthModaSlice";

const Restore = () => {
  const dispatch = useAppDispatch();

  const schema = yup.object().shape({
    phone: yup
      .string()
      .required("Поле не может быть пустым")
      .min(18, "Минимальное количество символов - 18")
      .max(18, "Минимальное количество символов - 18"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  const authModalState = useAppSelector((state) => state.authModal);

  const onOpenRestore = () => {
    dispatch(setAuthModal({ ...authModalState, view: "restore" }));
  };

  const onOpenRegister = () => {
    dispatch(setAuthModal({ ...authModalState, view: "register" }));
  };

  const onSubmit = (data: any) => {};

  return (
    <div className="auth">
      <Heading component="h1" type="auth">
        Восстановление пароля
      </Heading>
      <p className="auth_header-text fs_16">
        Мы отправим код подтверждения в SMS на Ваш номер телефона
      </p>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormField
          placeholder="Ваш телефон"
          value={watch("phone")}
          {...register("phone")}
          formType="phone"
          error={errors?.phone}
        />

        <Button type="submit" fullWidth disabled={!isValid}>
          Получить код подтверждения
        </Button>
      </Form>
    </div>
  );
};

export default Restore;
