import "../App.css"; // ✅ 한 단계 위로 올라가야 함
import "../data.jsx";
import { useState, useEffect, createContext } from "react";
import { Button, Navbar, Nav, Container } from "react-bootstrap";
import data from "../data.jsx";
import axios from "axios";
import { Link } from "react-router-dom";

// context는 state를 전역으로 관리하기 위한 방법(보관함))

function Home() {
  // 코드를 짜고싶을때 일단 한글로 적고 시작해라
  /*
  하고싶은것 : 최근 본 상품 2개 띄우기
  1. 누가 introduce 페이지를 접속했을때
  2. 그 페이지에 보이는 상품의 id를 가져와서
  3. 그 id를 localStorage의 watch-list에 저장한다.
  */

  // watcedIds는 localStorage에 저장된 watch-list를 가져온다.
  const watchedIds = JSON.parse(localStorage.getItem("watch-list")) || [];
  //watchedShoes는 shoes에서 id가 watchedIds에 포함된 것들만 가져온다.
  const watchedShoes = data.filter((s) => watchedIds.includes(s.id));

  useEffect(() => {
    const savedPhotos = JSON.parse(localStorage.getItem("my-photos"));
    if (savedPhotos) {
      setPhotos(savedPhotos);
      console.log("저장된 사진 목록:", savedPhotos);
    }
  }, []);

  let [shoes, setShoes] = useState(data);

  const [photos, setPhotos] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [inputText, setInputText] = useState("");

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => ({
      url: URL.createObjectURL(file),
      text: "",
      mood: null,
    }));

    setPhotos((prev) => {
      const updated = [...prev, ...newImages];
      localStorage.setItem("my-photos", JSON.stringify(updated));
      return updated;
    });
  };

  const openFileDialog = () => {
    document.getElementById("file-input").click();
  };

  const handleDeletePhoto = (indexToDelete) => {
    const confirmDelete = window.confirm("선택된 사진을 삭제하시겠습니까?");
    if (confirmDelete) {
      const updated = photos.filter((_, index) => index !== indexToDelete);
      setPhotos(updated);
      localStorage.setItem("my-photos", JSON.stringify(updated));
    }
  };

  const handleSaveText = (index) => {
    const updated = photos.map((photo, i) =>
      i === index ? { ...photo, text: inputText } : photo
    );
    setPhotos(updated);
    localStorage.setItem("my-photos", JSON.stringify(updated));
    setEditingIndex(null);
    setInputText("");
  };

  const moodOptions = ["😊", "😐", "😢"];

  const handleSelectMood = (index, selectedMood) => {
    const updated = photos.map((photo, i) =>
      i === index ? { ...photo, mood: selectedMood } : photo
    );
    setPhotos(updated);
    localStorage.setItem("my-photos", JSON.stringify(updated));
  };

  function Card({ item }) {
    return (
      <div className="card">
        <img
          src={`https://codingapple1.github.io/shop/shoes${item.id}.jpg`} // id에 맞는 이미지
          width="80%"
        />
        <h5>{item.title}</h5>
        <p>{item.content}</p>
        <p>{item.price.toLocaleString()}원</p>
      </div>
    );
  }

  function RecentViewed({ shoes }) {
    const watchedIds = JSON.parse(localStorage.getItem("watch-list")) || [];

    // watchedIds는 string 타입, shoes의 id는 number 타입일 수 있음
    const watchedShoes = shoes.filter(
      (s) => watchedIds.includes(s.id.toString()) // id를 string으로 변환하여 비교
    );

    return (
      <div className="recent-view-box">
        <h5>최근 본 상품</h5>
        {watchedShoes.map((item) => (
          <Link
            to={`/introduce/${item.id}`}
            key={item.id}
            className="recent-item"
          >
            <img
              src={`https://codingapple1.github.io/shop/shoes${item.id}.jpg`}
              alt={item.title}
            />
            <span>{item.title}</span>
          </Link>
        ))}
      </div>
    );
  }

  return (
    <>
      <div className="App">
        <RecentViewed shoes={shoes} />
        <div className="main-bg"></div>
        <div className="main-photo">
          <h2 className="main-subtitle">MY PHOTO</h2>
          <Button variant="outline-success" size="sm" onClick={openFileDialog}>
            등록
          </Button>
          <input
            type="file"
            accept="image/*"
            multiple
            id="file-input"
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
        </div>

        <p className="main-subtitle2">
          사진과 함께 짧은 한마디를 적어보세요 🥰
        </p>
        <div className="shoes-md">
          {shoes.map((item, index) => (
            <Card key={index} item={item} /> // item을 props로 전달
          ))}
        </div>
        <button
          onClick={() => {
            axios
              .get("https://codingapple1.github.io/shop/data2.json")
              .then((result) => {
                console.log(result.data);
                //shoes에서 가져온 데이터 보여줘
                console.log("shoes: ", shoes);
                let copyShoes = [...shoes, ...result.data];
                setShoes(copyShoes);
              });
            axios.post("");
          }}
        >
          더보기
        </button>

        <div className="main-photo-list">
          {photos.map((photo, index) => (
            <div key={index} className="photo-box">
              <img
                src={photo.url}
                alt={`uploaded-${index}`}
                style={{
                  width: "200px",
                  height: "250px",
                  borderRadius: "10px",
                  objectFit: "cover",
                }}
              />
              <div className="mood-options">
                {moodOptions.map((emoji) => (
                  <span
                    key={emoji}
                    onClick={() => handleSelectMood(index, emoji)}
                    className="mood-emoji"
                    style={{
                      filter: photo.mood === emoji ? "none" : "grayscale(100%)",
                      cursor: "pointer",
                      fontSize: "24px",
                      transition: "filter 0.3s",
                    }}
                  >
                    {emoji}
                  </span>
                ))}
              </div>

              {photo.text && <p className="photo-caption">{photo.text}</p>}

              {editingIndex === index ? (
                <div className="text-editor">
                  <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="사진에 대한 설명"
                  />
                  <Button size="sm" onClick={() => handleSaveText(index)}>
                    저장
                  </Button>
                </div>
              ) : (
                <div className="button-group">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => {
                      setEditingIndex(index);
                      setInputText(photo.text || "");
                    }}
                  >
                    글쓰기
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDeletePhoto(index)}
                  >
                    삭제
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Home;
