import React, { useEffect, useState } from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import GoogleLogin from "./components/googleLogin/GoogleLogin.jsx";
import NeomWebsite from './NeomWebsite'

function App() {
	const [user, setUser] = useState();

	return (
		<GoogleOAuthProvider clientId="1059014681918-q61snoptndd2edig5ncioj0m9ivtb4qt.apps.googleusercontent.com">
      <NeomWebsite />
		</GoogleOAuthProvider>
	);
}

export default App;




