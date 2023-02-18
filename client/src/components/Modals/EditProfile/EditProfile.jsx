import React, { useState, useEffect } from "react";
import { Avatar, Button, CheckBox, Form, FormField, Icon } from "components";
import FormSelect from "components/FormSelect/FormSelect";
import "./edit-profile.scss";
import { useDispatch, useSelector } from "react-redux";

import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { checkImage } from "utils/ImageUpload";
import { GLOBAL_TYPES } from "redux/types/globalTypes";
import { updateUser } from "redux/actions/profileAction";

const EditProfile = ({ setOpen }) => {
  const schema = yup.object().shape({
    fullname: yup.string().required("Поле fullname обязательное!"),
    mobile: yup.string(),
    address: yup.string(),
    website: yup.string(),
    story: yup.string(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty },

    watch,
    reset,
    control,
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  const auth = useSelector((state) => state.auth);
  const [select, setSelect] = useState(auth.user?.gender);
  const [file, setFile] = useState();

  const dispatch = useDispatch();

  const handleFile = (e) => {
    const file = e.target.files[0];

    const err = checkImage(file);

    if (err) return dispatch({ type: GLOBAL_TYPES.ERROR, payload: err });

    if (file) {
      setFile(file);
    }
  };

  useEffect(() => {
    reset(auth.user);
  }, [reset, auth.user]);

  const onSubmit = async (data) => {
    const newData = {
      ...data,
      gender: select,
    };

    const res = await dispatch(updateUser(newData, file, auth));

    if (res.data) {
      setOpen(false);
    }
  };

  return (
    <div className="edit-profile">
      <div className="edit-profile_ava">
        <div>
          <Avatar
            src={file ? URL.createObjectURL(file) : auth.user?.avatar}
            size="medium"
          />

          <div className="edit-profile_ava_add">
            <Icon type="Add" />
            <input type="file" onChange={handleFile} />
          </div>
        </div>

        <h2>@{auth.user?.username}</h2>
      </div>

      <Form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <div className="form-group_row">
            <FormField
              placeholder="Full Name"
              required
              {...register("fullname")}
              value={watch("fullname")}
              error={errors?.fullname}
            />
            <FormField
              placeholder="Mobile"
              {...register("mobile")}
              value={watch("mobile")}
              error={errors?.mobile}
            />
          </div>
          <div className="form-group_row">
            <FormField
              placeholder="Address"
              {...register("address")}
              value={watch("address")}
              error={errors?.address}
            />
            <FormField
              placeholder="Website"
              {...register("website")}
              value={watch("website")}
              error={errors?.website}
            />
          </div>

          <FormField
            placeholder="Story"
            formType="textarea"
            {...register("story")}
            value={watch("story")}
            error={errors?.story}
          />
          <FormSelect
            label="gender"
            select={select}
            setSelect={setSelect}
            data={[{ name: "Male" }, { name: "Female" }]}
          />
          {/* <Controller
            name="hide"
            control={control}
            render={({ field }) => (
              <CheckBox
                {...field}
                id="hide"
                label="Hide account"
                checked={watch("hide")}
              />
            )}
          /> */}
          <Button
            fullWidth
            className="submit"
            loading={isSubmitting}
            // disabled={disabled || !isDirty}
          >
            Save
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default EditProfile;
