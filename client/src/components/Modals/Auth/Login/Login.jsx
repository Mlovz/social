import "../auth.scss";

import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { Heading, Form, FormField, CheckBox, Button } from "components";
import { useDispatch, useSelector } from "react-redux";
import { AUTH_TYPES } from "redux/types/authTypes";
import { loginUser } from "redux/actions/authAction";

const Login = () => {
  const schema = yup.object().shape({
    email: yup
      .string()
      .email("Ввведите валидную почту")
      .required("Поле Email обязательное!"),
    password: yup
      .string()
      .required("Поле Пароль обязательное!")
      .min(6, "Минимальное количество символов (6) !"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
    control,
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });
  const dispatch = useDispatch();
  const authModal = useSelector((state) => state.authModal);

  // const onOpenRestore = () => {
  //   dispatch(setAuthModal({ ...authModalState, view: "restore" }));
  // };

  const onOpenRegister = () => {
    dispatch({
      type: AUTH_TYPES.MODAL,
      payload: { ...authModal, view: "register" },
    });
  };

  const onSubmit = (data) => {
    const newData = {
      email: data.email,
      password: data.password,
    };

    dispatch(loginUser(newData));
  };

  return (
    <div className="auth">
      <Heading component="h1" type="auth">
        Вход или регистрация
      </Heading>

      <Form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <FormField
            placeholder="Ваша почта"
            value={watch("email")}
            {...register("email")}
            error={errors?.email}
            required
          />
          <FormField
            placeholder="Пароль"
            value={watch("password")}
            type="password"
            {...register("password")}
            error={errors?.password}
            required
          />

          <div className="auth_checkbox">
            <Controller
              name="remember_me"
              control={control}
              render={({ field }) => (
                <CheckBox
                  {...field}
                  id="remember_me"
                  label="Запомнить пароль"
                  checked={watch("remember_me")}
                />
              )}
            />

            <Button className="bd fs_12">Забыли пароль?</Button>
          </div>
        </div>

        <Button type="submit" fullWidth>
          Войти
        </Button>
      </Form>

      <p className="auth_link fs_14">
        Еще не зарегистрированы?
        <Button className="bd" onClick={onOpenRegister}>
          Регистрация
        </Button>
      </p>
    </div>
  );
};

export default Login;
