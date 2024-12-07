import { useCallback, useEffect, useState } from "react";
import AdminModal from "./AdminModal";
import { Album } from "../../shared/models/album";
import { Music } from "../../shared/models/music";
import { Artist } from "../../shared/models/artist";

interface IAdminModalProvider {
  dataType: "music" | "album" | "artist" | "test";
  closeModal: () => void;
  fetchFunc: () => Promise<Album[] | Music[] | Artist[]>;
  modalFunc: (id: string) => Promise<void>;
}

const AdminModalProvider = ({
  dataType,
  closeModal,
  fetchFunc,
  modalFunc,
}: IAdminModalProvider) => {
  const [data, setData] = useState<Album[] | Music[] | Artist[]>([]);
  // const [isLoading, setIsLoading] = useState<boolean>(false);

  const executeFetch = useCallback(async () => {
    // setIsLoading(true);
    const result = await fetchFunc();
    setData(result);
    // setIsLoading(false);
  }, [fetchFunc]);

  useEffect(() => {
    executeFetch();
  }, [executeFetch]);

  return (
    <AdminModal
      closeModal={closeModal}
      dataList={data}
      dataType={dataType}
      modalFunc={modalFunc}
    />
  );
};

export default AdminModalProvider;
