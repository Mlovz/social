import "../auth.scss";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

import { Button, Form, FormField, Heading } from "components";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "redux/actions/authAction";
import { AUTH_TYPES } from "redux/types/authTypes";

const Register = () => {
  const schema = yup.object().shape({
    email: yup
      .string()
      .email("Ввведите валидную почту")
      .required("Поле Email обязательное!"),
    fullname: yup.string().required("Поле Имя обязательное!"),
    username: yup.string().required("Поле Nick обязательное!"),
    password: yup
      .string()
      .required("Поле Пароль обязательное!")
      .min(6, "Минимальное количество символов (6) !"),
    cf_password: yup
      .string()
      .required("Поле Пароль обязательное!")
      .min(6, "Минимальное количество символов (6) !")
      .oneOf([yup.ref("password")], "Пароли не совпадают!"),
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

  const dispatch = useDispatch();
  const authModal = useSelector((state) => state.authModal);

  const onOpenLogin = () => {
    dispatch({
      type: AUTH_TYPES.MODAL,
      payload: { ...authModal, view: "login" },
    });
  };

  const onSubmit = (data) => {
    const { email, username, fullname, password } = data;
    const newData = {
      email,
      username,
      fullname,
      password,
      gender: "man",
    };
    dispatch(registerUser(newData));
  };

  return (
    <div className="auth">
      <Heading component="h1" type="auth">
        Вход или регистрация
      </Heading>

      <Form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <FormField
            placeholder="Ваш Почта"
            value={watch("email")}
            {...register("email")}
            formType="email"
            error={errors?.email}
            required
          />
          <FormField
            placeholder="Ваше имя"
            value={watch("fullname")}
            {...register("fullname")}
            error={errors?.fullname}
            required
          />

          <FormField
            placeholder="Ваш ник"
            value={watch("username")}
            {...register("username")}
            error={errors?.username}
            required
          />
          <FormField
            type="password"
            placeholder="Пароль"
            value={watch("password")}
            {...register("password")}
            error={errors?.password}
            required
          />
          <FormField
            type="password"
            placeholder="Подтверждение пароля"
            value={watch("cf_password")}
            {...register("cf_password")}
            error={errors?.cf_password}
            required
          />
          <p className="fs_12">
            Нажимая на кнопку войти, на вашу почту будет отправлено код из 4-x
            символов
          </p>
          <Button type="submit" fullWidth disabled={!isValid}>
            Зарегистрироваться
          </Button>
        </div>
      </Form>

      <p className="auth_link fs_14">
        Уже есть аккаунт?
        <Button onClick={onOpenLogin} className="bd">
          Войти
        </Button>
      </p>
    </div>
  );
};

export default Register;
