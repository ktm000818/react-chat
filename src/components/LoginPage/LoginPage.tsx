import useLoginCheck from "@/custom-hooks/useLoginCheck";
import { auth, database } from "@/firebaseModule";
import { ref, update } from "@firebase/database";
import styles from "@styles/auth.module.scss";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { Button } from "react-bootstrap";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

interface FormValues {
  email: string;
  password: string;
}

export default function Page() {
  useLoginCheck();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const updateUserLoginState = async (uid: string) => {
    const dbRef = ref(database);
    const updates: any = {};
    updates[`users/${uid}/isLogin`] = true;
    updates[`users_chatroom/${uid}/isLogin`] = true;
    updates[`users/${uid}/isLogin`] = true;
    updates[`users/${uid}/isLogin`] = true;
    updates[`users/${uid}/isLogin`] = true;
    updates[`users/${uid}/isLogin`] = true;
    await update(dbRef, updates);
  };

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      setLoading(true);
      const { email, password } = data;
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      if (user) {
        updateUserLoginState(user.uid);
        navigate("/");
      }
    } catch (error: any) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles["container"]}>
      <form className={styles["form"]} onSubmit={handleSubmit(onSubmit)}>
        <h1 className={styles["h1"]}>Sign in</h1>
        <label className={styles["label"]}>Email</label>
        <input type="email" className={styles["input"]} {...register("email", { required: true })} />
        {errors.email && <span className={styles["alert"]}>This field is required</span>}

        <label className={styles["label"]}>Password</label>
        <input className={styles["input"]} type="password" {...register("password", { required: true })} />
        {errors.password && <span className={styles["alert"]}>This field is required</span>}

        <Button className={styles["button-submit"]} type="submit" disabled={loading}>
          SUBMIT
        </Button>

        <label className={styles["label"]}>
          <span onClick={() => navigate("/register")}>계정이 없다면..</span>
        </label>
      </form>
    </div>
  );
}
