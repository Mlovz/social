import React, { useState, useRef, useEffect } from "react";
import "./post-modal.scss";

import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { useDispatch, useSelector } from "react-redux";
import { Button, Form, FormField, Heading, Icon } from "components";
import { GLOBAL_TYPES } from "redux/types/globalTypes";
import { createPost, updatePost } from "redux/actions/postAction";
import Spinner from "components/Spinner/Spinner";

const PostModal = () => {
  const schema = yup.object().shape({
    content: yup
      .string()
      .required("Поле не может быть пустым")
      .max(200, "Максимальное количество 200")
      .min(30, "Минимальное количество 30"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    reset,
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  const { auth, status, socket } = useSelector((state) => state);
  const dispatch = useDispatch();

  const [images, setImages] = useState([]);
  const [stream, setStream] = useState(false);
  const [tracks, setTracks] = useState("");

  const streamRef = useRef();
  const cavasRef = useRef();

  const handleChangeImages = (e) => {
    const files = [...e.target.files];
    let err = "";
    let newImages = [];

    files.forEach((file) => {
      if (!file) return (err = "Вы не выбрали файл(а-ов)!");

      if (
        // file.type !== "image/jpeg" &&
        // file.type !== "image/png" &&
        // file.type !== "image/avif" &&
        file.size >
        1024 * 1024 * 5
      ) {
        // return (err = "Выберите другой формат.");
        return (err = "Размер фото слишком большой (5mb)");
      }

      return newImages.push(file);
    });

    if (err) return dispatch({ type: GLOBAL_TYPES.ERROR, payload: err });

    setImages([...images, ...newImages]);
  };

  const deleteImage = (index) => {
    const newImage = [...images];
    newImage.splice(index, 1);
    setImages(newImage);
  };

  const handleStream = () => {
    setStream(true);

    if (navigator.mediaDevices && navigator.mediaDevices.getDisplayMedia) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((media) => {
          streamRef.current.srcObject = media;
          streamRef.current.play();
          const track = media.getTracks();
          setTracks(track[0]);
        })
        .catch((err) => console.log(err));
    }
  };

  const handleCapture = () => {
    const width = streamRef.current.clientWidth;
    const height = streamRef.current.clientHeight;

    cavasRef.current.setAttribute("width", width);
    cavasRef.current.setAttribute("height", height);

    const ctx = cavasRef.current.getContext("2d");

    ctx.drawImage(streamRef.current, 0, 0, width, height);

    let url = cavasRef.current.toDataURL();

    setImages([...images, { camera: url }]);
  };

  const handleStopStream = () => {
    tracks.stop();
    setStream(false);
  };

  const onSubmit = async (data) => {
    if (images.length === 0)
      return dispatch({
        type: GLOBAL_TYPES.ERROR,
        payload: "Пожалуйста выберите фото!",
      });

    let res;

    if (status.onEdit) {
      res = await dispatch(
        updatePost({ content: data.content, images, auth, status })
      );
    } else {
      res = await dispatch(
        createPost({ content: data.content, images, auth, socket })
      );
    }

    if (tracks) tracks.stop();

    if (res) {
      setImages([]);
      reset({ content: "" });
    }
  };

  useEffect(() => {
    if (status.onEdit) {
      const newContent = {
        content: status.content,
      };

      reset(newContent);
      setImages(status.images);
    }
  }, [status]);

  const imageShow = (src) => {
    return <img src={src} alt="" />;
  };

  const videoShow = (src) => {
    return <video src={src} alt="" />;
  };

  return (
    <div className="post-modal">
      <Heading component="h1" type="auth">
        Add Post
      </Heading>

      <Form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <FormField
            formType="textarea"
            placeholder={`${auth.user.username}, What's new?`}
            {...register("content")}
            value={watch("content")}
            error={errors?.content}
          />
          <div className="post-modal_icons">
            <span>{watch("content")?.length} / 200 </span>

            <div>
              <div className="icon_file">
                <Icon type="Attach" />
                <input
                  type="file"
                  accept="image/*, video/*"
                  multiple
                  onChange={handleChangeImages}
                />
              </div>
              <Icon type="Video" onClick={handleStream} />
            </div>
          </div>

          <div className="post-modal_images">
            {images?.map((img, index) => (
              <div className="img">
                {img.camera ? (
                  imageShow(img.camera)
                ) : img.url ? (
                  <>
                    {img.url.match(/video/i)
                      ? videoShow(img.url)
                      : imageShow(img.url)}
                  </>
                ) : (
                  <>
                    {img.type.match(/video/i)
                      ? videoShow(URL.createObjectURL(img))
                      : imageShow(URL.createObjectURL(img))}
                  </>
                )}

                <span onClick={() => deleteImage(index)}>&times;</span>
              </div>
            ))}
          </div>

          {stream && (
            <div className="stream">
              <video src="" autoPlay muted ref={streamRef} />

              <canvas ref={cavasRef} style={{ display: "none" }} />
              <div className="stream_btns">
                <Button className="outline" onClick={handleStopStream}>
                  Закрыть стрим
                </Button>
                <Button onClick={handleCapture}>Сделать фото</Button>
              </div>
            </div>
          )}

          <div className="post-modal_footer">
            <Button type="submit">{isSubmitting ? "Loading..." : "Add"}</Button>
            {isSubmitting && <Spinner />}
          </div>
        </div>
      </Form>
    </div>
  );
};

export default PostModal;
