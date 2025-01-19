import React, {useState, useContext} from "react";
import {useNavigate} from "react-router-dom";
import {AppContext} from "../../contexts/AppProvider.jsx";

function Login() {
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const {setUser} = useContext(AppContext);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!id || !password) {
            setError("ID와 비밀번호를 입력해주세요.");
            return;
        }


        setUser({userId: id, userPw: password}); // AppContext에 사용자 정보 저장
        navigate("/"); // 메인 페이지로 이동
    };

    return (
        <div style={{maxWidth: "400px", margin: "0 auto", padding: "20px"}}>
            <h2>로그인</h2>
            <form onSubmit={handleSubmit}>
                <div style={{marginBottom: "15px"}}>
                    <label style={{display: "block", marginBottom: "5px"}}>
                        ID:
                    </label>
                    <input
                        type="text"
                        value={id}
                        onChange={(e) => setId(e.target.value)}
                        placeholder="ID 입력"
                        style={{
                            width: "100%",
                            padding: "8px",
                            fontSize: "16px",
                            boxSizing: "border-box",
                        }}
                    />
                </div>
                <div style={{marginBottom: "15px"}}>
                    <label style={{display: "block", marginBottom: "5px"}}>
                        비밀번호:
                    </label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="비밀번호 입력"
                        style={{
                            width: "100%",
                            padding: "8px",
                            fontSize: "16px",
                            boxSizing: "border-box",
                        }}
                    />
                </div>
                {error && (
                    <p style={{color: "red", marginBottom: "15px"}}>{error}</p>
                )}
                <button
                    type="submit"
                    style={{
                        width: "100%",
                        padding: "10px",
                        fontSize: "16px",
                        backgroundColor: "#007BFF",
                        color: "#fff",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                    }}
                >
                    로그인
                </button>
            </form>
        </div>
    );
}

export default Login;