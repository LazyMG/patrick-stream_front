import { useNavigate } from "react-router-dom";

export const useAdmin = () => {
  const navigate = useNavigate();

  const getAdmin = async () => {
    const result = await fetch(`http://localhost:5000/auth/admin`, {
      credentials: "include",
    }).then((res) => res.json());
    if (result.ok) {
      if (result.isAdmin) {
        //진행
      } else {
        ////돌려보내기
        //navigate("/")
      }
      console.log(result.isAdmin);
    } else {
      navigate("/");
    }
  };

  return getAdmin;
};
