import React, { useEffect } from "react";
import Index from "./Index";
import { useForm } from "react-hook-form";
import { createUser, getAllUsers, updateUser } from "../Api/userApi";
import Loader from "./Loader";

const AddEditUser = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm();

  const dispatch = Index.useDispatch();
  const loading = Index.useSelector((state) => state.userReducer.loading);

  const onSubmit = (data) => {
    const urlencoded = new URLSearchParams();
    urlencoded.append("user_name", data.user_name);
    urlencoded.append("user_email", data.user_email);
    urlencoded.append("user_phone", data.user_contact);
    data.user_password &&
      urlencoded.append("user_password", data.user_password);
    props.row && urlencoded.append("id", props.row?._id);

    if (props.row) {
      dispatch(updateUser(urlencoded)).then(() => {
        dispatch(getAllUsers());
      });
    } else {
      dispatch(createUser(urlencoded)).then(() => {
        dispatch(getAllUsers());
      });
    }

    reset();
    props.handleClose();
  };

  useEffect(() => {
    if (props?.row) {
      setValue("user_name", props?.row?.user_name);
      setValue("user_email", props?.row?.user_email);
      setValue("user_contact", props?.row?.user_phone);
    }
  },[]);

  return (
    <>
      {loading === true ? (
        <Loader />
      ) : (
        <Index.Modal open={props.open} onClose={props.handleClose}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Index.Box
              sx={Index.Constant.MODAL_STYLE}
              className="add-edit-modal"
            >
              <Index.Box>
                <Index.FormHelperText>User Name</Index.FormHelperText>

                <Index.TextField
                  fullWidth
                  name="user_name"
                  {...register("user_name", {
                    required: "User name is required",
                  })}
                  error={Boolean(errors.user_name)}
                  helperText={errors.user_name?.message}
                ></Index.TextField>
              </Index.Box>

              <Index.Box>
                <Index.FormHelperText>User Email</Index.FormHelperText>

                <Index.TextField
                  fullWidth
                  name="user_email"
                  {...register("user_email", {
                    required: "User email is required",
                    pattern: {
                      value: /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/,
                      message: "Please enter a valid email",
                    },
                  })}
                  error={Boolean(errors.user_email)}
                  helperText={errors.user_email?.message}
                ></Index.TextField>
              </Index.Box>

              <Index.Box>
                <Index.FormHelperText>User Contact</Index.FormHelperText>

                <Index.TextField
                  fullWidth
                  name="user_contact"
                  {...register("user_contact", {
                    required: "User contact is required",
                    pattern: {
                      value: /^([+]\d{2})?\d{10}$/,
                      message: "Please enter a valid contact number",
                    },
                  })}
                  error={Boolean(errors.user_contact)}
                  helperText={errors.user_contact?.message}
                ></Index.TextField>
              </Index.Box>

              {!props?.row && (
                <Index.Box>
                  <Index.FormHelperText>User Password</Index.FormHelperText>

                  <Index.TextField
                    fullWidth
                    name="user_password"
                    {...register("user_password", {
                      required: "User password is required",
                    })}
                    error={Boolean(errors.user_password)}
                    helperText={errors.user_password?.message}
                  ></Index.TextField>
                </Index.Box>
              )}
              <Index.Box className="modal-submit-btn">
                <Index.Button onClick={props.handleClose}>Discard</Index.Button>
                <Index.Button type="submit">Submit</Index.Button>
              </Index.Box>
            </Index.Box>
          </form>
        </Index.Modal>
      )}
    </>
  );
};

export default AddEditUser;
