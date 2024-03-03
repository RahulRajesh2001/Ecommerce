import React, { useEffect, useState } from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import GoogleLogin from "./components/googleLogin/GoogleLogin.jsx";
import NeomWebsite from './NeomWebsite'

function App() {
	const [user, setUser] = useState();

	return (
		<GoogleOAuthProvider clientId="163584497548-6uovpebrvioqdepje90dinuagvi60ulc.apps.googleusercontent.com">
			<div className="App">
				<GoogleLogin setUser={setUser}></GoogleLogin>
				{user && user.name}
				{user && user.email}
			</div>
      <NeomWebsite />
		</GoogleOAuthProvider>
	);
}

export default App;




