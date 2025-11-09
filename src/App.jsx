import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import MemoTop from './Components/MemoTop'
import MemoBody from './Components/MemoBody'

const App = () =>  {
  const [text, setText] = useState("");
  const [currentTab, setCurrentTab] = useState("仕事")
  const [editingIndex, setEditingIndex] = useState(null);
  const [editText, setEditText] = useState("");
  const [memos, setMemos] = useState(() => {
    const saved =localStorage.getItem("my-memos");
    return saved ? JSON.parse(saved) : {
    仕事: [],
    趣味: [],
    その他:[],
    }
  });

  const addMemo = () => {
    if(text.trim() === "")return;

    setMemos({
      ...memos,
      [currentTab]:[...memos[currentTab], text],
    });
    setText("")
  };

  const startEdit = (index) => {
    setEditingIndex(index);
    setEditText(memos[currentTab][index]);
  }

  const saveEdit = () => {
    if (editText.trim() === "")return;

    const updated = [...memos[currentTab]];
    updated[editingIndex] = editText;

    setMemos({
      ...memos,
      [currentTab]: updated,
    });

    setEditingIndex(null);
    setEditText("");
  }

  const deleteMemo = (index) =>{
    const updated = [...memos[currentTab]];
    updated.splice(index,1);
    
    setMemos({
      ...memos,
      [currentTab]: updated,
    });
  };

  useEffect(() => {
    const saved = localStorage.getItem("my-memos");
    if(saved) {
      setMemos(JSON.parse (saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("my-memos", JSON.stringify(memos));
  }, [memos])
  ;
  return (
    <>
        <MemoTop />
        <div className='tabs tabs-lift flex justify-center mt-8'>
        {["仕事", "趣味", "その他"].map((tab)=> (
          <a key={tab}
          role='tab'
          className={`tab ${currentTab === tab ? "tab-active" : ""}`}
          onClick={()=>setCurrentTab(tab)}
          style={{
            padding: "8px 16px",
            margin: "0 5px",
            cursor: "pointer",
            backgroundColor: currentTab === tab ? "#eee" : "#ccc",
            borderRadius: "8px",
          }}
          >
            {tab}
          </a>
        ))}  
        </div>   
        <div style= {{ marginTop: "20px"}}>
          <textarea
          type="text"
          wrap="soft"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={`${currentTab}のメモを入力`}
          style={{
            padding: "8px",
            width: "250px",
            height: "150px",
            marginRight: "8px",
          }}
          disabled={editingIndex !== null}
          />
          <button onClick={addMemo} disabled={editingIndex !== null}>追加</button>
        </div>

        <ul style={{marginTop: "20px"}}>
          {memos[currentTab].map((memo,index) => (
            <li key={index} style={{marginBottom: "8px"}}>
            {editingIndex === index ? (
              <>
              <textarea 
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              style={{
                height: "200px",
                marginRight: "8px"}}
              />
              <button onClick={saveEdit}>保存</button>
              <button onClick={() => setEditingIndex(null)} style={{marginLeft: "4px"}}>キャンセル</button>
              </>
              ) : (
              <>
                {memo}{""}
                <button onClick={() => startEdit(index)} style={{marginLeft: "8px"}}>編集</button>
                <button onClick={() => deleteMemo(index)} style={{marginLeft: "8px"}}>削除</button>
              </>
            )}
            </li>
          ))}
        </ul>
        
    </>
  );
};

export default App;
