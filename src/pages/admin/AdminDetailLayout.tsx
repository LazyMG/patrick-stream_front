import styled from "styled-components";
import AdminDetailButtons from "../../widgets/admin/AdminDetailButtons";

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px 20%;
  gap: 20px;
  position: relative;
`;

const ContentHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  a {
    text-decoration: none;
    color: #000;
  }
`;

const ContentRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  justify-content: center;
  align-items: center;
  padding: 20px 10px;
  border: 1px solid black;
`;

const Image = styled.img`
  width: 300px;
  height: 300px;
  background-color: blue;
`;

// const CommentContainer = styled.div`
//   width: 100%;
//   display: flex;
//   flex-direction: column;
//   gap: 10px;
//   background-color: blue;
//   padding: 10px 15px;
// `;

// const Comment = styled.div`
//   display: flex;
//   height: 50px;
//   background-color: white;
//   border-radius: 15px;
// `;

const YoutubeContainer = styled.iframe`
  width: 100%;
  height: 600px;
`;

const Introduction = styled.p`
  background-color: yellow;
  width: 100%;
  padding: 10px 15px;
  height: 20px;
`;

interface AdminButtonConfig {
  firstButtonConfig: {
    modalOpen: () => void;
    buttonText: string;
  };
  secondButtonConfig: {
    modalOpen: () => void;
    buttonText: string;
  };
  path: string;
  deleteFunc: () => void;
}

interface IDetailLayout {
  infoData: string[];
  imageSrc: string;
  comments?: JSX.Element[]; // 추후 comment 타입 배열로 변경
  buttonsConfig: AdminButtonConfig;
  ytId?: string;
  introduction?: string;
}

const AdminDetailLayout = ({
  infoData,
  imageSrc,
  buttonsConfig,
  ytId,
  introduction,
}: IDetailLayout) => {
  return (
    <ContentContainer>
      <ContentHeader>
        <AdminDetailButtons {...buttonsConfig} />
      </ContentHeader>
      <Content>
        <ContentRow>
          <Info>
            {infoData.map((info, idx) => (
              <p key={idx}>{info}</p>
            ))}
          </Info>
          <Image src={imageSrc} />
        </ContentRow>
        {ytId && (
          <YoutubeContainer src={`https://www.youtube.com/embed/${ytId}`} />
        )}
        {introduction && (
          <ContentRow>
            <Introduction>{introduction}</Introduction>
          </ContentRow>
        )}
        {/* <ContentRow>
          <CommentContainer>
            {comments.map((comment, idx) => (
              <Comment key={idx}>{comment}</Comment>
            ))}
          </CommentContainer>
        </ContentRow> */}
      </Content>
    </ContentContainer>
  );
};

export default AdminDetailLayout;
