import "../auth.scss";

import { Heading, Form, FormField, CheckBox, Button } from "@/common";
import { useAppDispatch, useAppSelector } from "@/hooks/useStore";
import { setAuthModal } from "@/redux/features/auth/AuthModaSlice";

const NewPassword = () => {
  const dispatch = useAppDispatch();
  const authModalState = useAppSelector((state) => state.authModal);

  const onOpenRestore = () => {
    dispatch(setAuthModal({ ...authModalState, view: "restore" }));
  };

  const onOpenRegister = () => {
    dispatch(setAuthModal({ ...authModalState, view: "register" }));
  };

  return (
    <div className="auth">
      <Heading component="h1" type="auth">
        Придумайте новый пароль
      </Heading>

      <Form onSubmit={() => {}}>
        <FormField placeholder="Новый пароль" value="1" type="password" />
        <FormField
          placeholder="Подтверждение нового пароля"
          value="1"
          type="password"
        />

        <p className="fs_12">
          После нажатия кнопки “Сохранить” Ваш предыдущий пароль будет
          анулирован и будет использоваться только новый.{" "}
        </p>
        <Button type="submit" fullWidth>
          Войти с новым паролем
        </Button>
      </Form>
    </div>
  );
};

export default NewPassword;
