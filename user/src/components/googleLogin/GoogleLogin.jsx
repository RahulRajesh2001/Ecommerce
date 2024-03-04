import React from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { googleAuth } from "../../components/googleLogin/services/api.js";
import Google from '../../assets/Google.png'

const GoogleLoginComponent = (props) => {
	const responseGoogle = async (authResult) => {
		try {
			if (authResult["code"]) {
				console.log(authResult.code);
				const result = await googleAuth(authResult.code);
				props.setUser(result.data.data.user);
				console.log("this is user", result.data.data.user);
				alert("Successfully logged in");
			} else {
				console.log("is this error", authResult);
				throw new Error(authResult);
			}
		} catch (e) {
			console.log(e);
		}
	};

	const googleLogin = useGoogleLogin({
		onSuccess: responseGoogle,
		onError: responseGoogle,
		flow: "auth-code",
	});

	return (
		<>
			<div onClick={googleLogin}
          className='h-[35px] border border-[#E4E7E9] flex  items-center mt-5 cursor-pointer'
        >
          <img src={Google} alt='' className='ml-[10px]' />
          <div className='text-[11px] text-[#475156]  ml-16'>
            Login with Google
          </div>
        </div>
		</>
	);
};

export default GoogleLoginComponent;
