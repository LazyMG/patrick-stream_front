import { useCallback, useEffect, useState } from "react";
import AdminModal from "./AdminModal";
import { APIAlbum } from "../../shared/models/album";
import { APIMusic } from "../../shared/models/music";
import { APIArtist } from "../../shared/models/artist";

interface IAdminModalProvider {
  dataType: "music" | "album" | "artist";
  closeModal: () => void;
  fetchFunc: () => Promise<APIAlbum[] | APIMusic[] | APIArtist[]>;
  modalFunc: (id: string, name?: string) => Promise<void>;
}

const AdminModalProvider = ({
  dataType,
  closeModal,
  fetchFunc,
  modalFunc,
}: IAdminModalProvider) => {
  const [data, setData] = useState<APIAlbum[] | APIMusic[] | APIArtist[]>([]);
  // const [isLoading, setIsLoading] = useState<boolean>(false);

  const executeFetch = useCallback(async () => {
    // setIsLoading(true);
    const result = await fetchFunc();
    setData(result);
    // console.log(result);
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
