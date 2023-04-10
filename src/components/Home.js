import React, { useState, useEffect } from "react";
import Index from "./Index";
import { deleteUser, getAllUsers } from "../Api/userApi";
import AddEditUser from "./AddEditUser";
import Loader from "./Loader";

const Home = () => {
  const [userData, setUserData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [open, setOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [row, setRow] = useState("");

  const dispatch = Index.useDispatch();
  const users = Index.useSelector((state) => state.userReducer.user);
  const loading = Index.useSelector((state) => state.userReducer.loading);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  useEffect(() => {
    setUserData(users);
    setFilterData(users);
  }, [users]);

  function paginate(array, page_size, page_number) {
    return array?.slice((page_number - 1) * page_size, page_number * page_size);
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDeleteOpen = () => {
    setDeleteOpen(true);
  };

  const handleDeleteClose = () => {
    setDeleteOpen(false);
  };

  const hanldeDeleteReocrd = async () => {
    dispatch(deleteUser(row?._id)).then(() => {
      dispatch(getAllUsers());
    });
    handleDeleteClose();
  };

  const handleFilterData = (e) => {
    if (e.target.value === "") {
      setFilterData(userData);
    } else {
      const result = userData.filter((item) => {
        return (
          item?.user_name
            ?.toLowerCase()
            .includes(e.target.value?.toLowerCase()) ||
          item?.user_email
            ?.toLowerCase()
            .includes(e.target.value?.toLowerCase()) ||
          item?.user_phone
            ?.toString()
            .toLowerCase()
            .includes(e.target.value?.toLowerCase())
        );
      });

      setFilterData(result);
      setPage(0);
    }
  };

  return (
    <>
      {loading === true ? (
        <Loader />
      ) : (
        <Index.Box>
          <Index.Box className="serach-and-add-box">
            <Index.TextField
              placeholder="search user"
              className="search-textfield"
              onChange={handleFilterData}
            />
            <Index.Button
              className="add-btn"
              variant="contained"
              onClick={() => {
                setRow("");
                handleOpen();
              }}
            >
              Add User
            </Index.Button>
          </Index.Box>

          <Index.TableContainer component={Index.Paper} className="main-table">
            <Index.Table>
              <Index.TableHead>
                <Index.TableRow>
                  <Index.TableCell>Name</Index.TableCell>
                  <Index.TableCell>Email</Index.TableCell>
                  <Index.TableCell>Contact</Index.TableCell>
                  <Index.TableCell>Action</Index.TableCell>
                </Index.TableRow>
              </Index.TableHead>

              <Index.TableBody>
                {filterData.length > 0
                  ? filterData &&
                    paginate(filterData, rowsPerPage, page + 1).map(
                      (row, index) => {
                        return (
                          <Index.TableRow key={index}>
                            <Index.TableCell>{row.user_name}</Index.TableCell>
                            <Index.TableCell>{row.user_email}</Index.TableCell>
                            <Index.TableCell>{row.user_phone}</Index.TableCell>
                            <Index.TableCell>
                              <Index.Stack direction={"row"}>
                                <Index.Button
                                  className="edit-btn"
                                  variant="contained"
                                  onClick={() => {
                                    setRow(row);
                                    handleOpen();
                                  }}
                                >
                                  Edit
                                </Index.Button>
                                <Index.Button
                                  className="delete-btn"
                                  variant="contained"
                                  color="error"
                                  onClick={() => {
                                    setRow(row);
                                    handleDeleteOpen();
                                  }}
                                >
                                  Delete
                                </Index.Button>
                              </Index.Stack>
                            </Index.TableCell>
                          </Index.TableRow>
                        );
                      }
                    )
                  : "No User found"}
              </Index.TableBody>
            </Index.Table>

            <Index.TablePagination
              rowsPerPageOptions={[5, 10, 25, 100]}
              component="div"
              count={filterData?.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Index.TableContainer>
          {open && (
            <AddEditUser
              open={open}
              handleClose={handleClose}
              handleOpen={handleOpen}
              row={row}
            />
          )}

          <Index.Modal
            open={deleteOpen}
            onClose={handleDeleteClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            className="modal-delete"
          >
            <Index.Box
              sx={Index.Constant.MODAL_STYLE}
              className="delete-modal-inner-main"
            >
              <Index.Box className="modal-circle-main">
                <img
                  src={Index.closeCircle}
                  className="user-circle-img"
                  alt="dlete-img"
                />
              </Index.Box>
              <Index.Typography
                className="delete-modal-title"
                component="h2"
                variant="h2"
              >
                Are you sure?
              </Index.Typography>
              <Index.Typography
                className="delete-modal-para common-para"
                component="p"
                variant="p"
              >
                Do you really want to delete these records? This process cannot
                be undone.
              </Index.Typography>
              <Index.Box className="delete-modal-btn-flex">
                <Index.Button
                  className="modal-cancel-btn modal-btn"
                  onClick={handleDeleteClose}
                >
                  Cancel
                </Index.Button>
                <Index.Button
                  className="modal-delete-btn modal-btn"
                  onClick={hanldeDeleteReocrd}
                >
                  Delete
                </Index.Button>
              </Index.Box>
            </Index.Box>
          </Index.Modal>
        </Index.Box>
      )}
    </>
  );
};

export default Home;
