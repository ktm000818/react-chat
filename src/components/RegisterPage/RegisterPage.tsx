"use client";

import { auth, database } from "../../firebaseModule";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, set } from "firebase/database";
import { useRef, useState } from "react";
import { Button } from "react-bootstrap";
import { SubmitHandler, useForm } from "react-hook-form";
import styles from "@styles/auth.module.scss";
import { Md5 } from "ts-md5";
import { useNavigate } from "react-router-dom";
import useLoginCheck from "@/custom-hooks/useLoginCheck";

interface FormValues {
  email: string;
  nickname: string;
  password: string;
  passwordConfirm: string;
}

export default function RegisterPage() {
  useLoginCheck();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>();
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      setLoading(true);
      const { email, password, nickname, passwordConfirm } = data;
      const createdUser = await createUserWithEmailAndPassword(auth, email, password);

      await updateProfile(auth.currentUser as any, {
        displayName: nickname,
        photoURL: `http://gravatar.com/avatar/${Md5.hashStr(createdUser.user.email as string)}?d=identicon`,
      });

      set(ref(database, "users/" + createdUser.user.uid), {
        name: createdUser.user.displayName,
        image: createdUser.user.photoURL,
        isLogin: false,
      });

      navigate("/login");
    } catch (error: any) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const password = useRef("");
  password.current = watch("password");

  return (
    <div className={styles["container"]}>
      {/* /* "handleSubmit" will validate your inputs before invoking "onSubmit"  */}
      <form className={styles["form"]} onSubmit={handleSubmit(onSubmit)}>
        {/* register your input into the hook by invoking the "register" function */}
        <h1 className={styles["h1"]}>Sign up</h1>
        <label className={styles["label"]}>Email</label>
        <input type="email" className={styles["input"]} {...register("email", { required: true })} />
        {errors.email && <span className={styles["alert"]}>This field is required</span>}
        <label className={styles["label"]}>Nickname</label>
        <input className={styles["input"]} {...register("nickname", { required: true })} />
        {errors.nickname && <span className={styles["alert"]}>This field is required</span>}
        {/* include validation with required or other standard HTML validation rules */}
        <label className={styles["label"]}>Password</label>
        <input className={styles["input"]} type="password" {...register("password", { required: true, minLength: 6 })} />
        {/* errors will return when field validation fails  */}
        {errors.password && errors.password.type === "required" && <span className={styles["alert"]}>This field is required</span>}
        {errors.password && errors.password.type === "minLength" && <span className={styles["alert"]}>password should be 6 characters at least.</span>}
        <label className={styles["label"]}>Password Confirm</label>
        <input
          className={styles["input"]}
          type="password"
          {...register("passwordConfirm", {
            required: true,
            validate: (value) => value === password.current,
          })}
        />
        {/* errors will return when field validation fails  */}
        {errors.passwordConfirm && errors.passwordConfirm.type === "required" && <span className={styles["alert"]}>This field is required</span>}
        {errors.passwordConfirm && errors.passwordConfirm.type === "validate" && <span className={styles["alert"]}>wrong password. check again.</span>}

        <Button className={styles["button-submit"]} type="submit" disabled={loading}>
          SUBMIT
        </Button>

        <label className={styles["label"]}>
          <span onClick={() => navigate("/login")}>이미 계정이 있다면..</span>
        </label>
      </form>
    </div>
  );
}
