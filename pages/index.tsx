import { useState } from "react";
import Layout from "@/components/Layout";
import { IoIosArrowForward } from "react-icons/io";

import { ErrorCodes } from "firebaseErrorCodes";
import panelData from "../data/panelData.json";
//redux
import { connect } from "react-redux";
import { UserActionList, ReducerStoreState } from "@/store/actions";

import Panel from "@/components/Rows/Panel";
import FAQ from "@/components/FAQ";
import Spinner from "@/components/UI/Spinner";
import { Fade } from "react-awesome-reveal";
interface AppProps {
    initializeAuth: (email: string, password: string, login: boolean) => {};

    AuthData: any;
}

const Home: React.FC<AppProps> = (props) => {
    const { AuthData, initializeAuth } = props;
    const [model, setmodel] = useState(false);
    const [email, setEmail] = useState<string>("");
    const [password, setpassword] = useState<string>("");

    const modelHandler = (e) => {
        e.preventDefault();
        setmodel(true);
    };

    const LogingHandler = (e) => {
        e.preventDefault();
        initializeAuth(email, password, true);
    };

    const demoLogin = () => {
        console.log("demo");
        initializeAuth("sample@sam.com", "sample@123", true);
    };

    const SignUp = () => {
        initializeAuth(email, password, false);
    };

    const content = (
        <>
            <div className="content">
                <h1>Unlimited movies, TV shows and more.</h1>
                <h3>Watch anywhere. Cancel anytime.</h3>
                <h3>
                    Ready to watch? Enter your email to create or restart your
                    membership.
                </h3>
                <form onSubmit={modelHandler}>
                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        placeholder="Email address"
                    />
                    <button type="submit">
                        Get Started <IoIosArrowForward />
                    </button>
                </form>
            </div>
        </>
    );

    const panelViews = (
        <>
            <div className="panel-collection">
                {panelData.map((each, index) => {
                    return (
                        <Panel
                            key={each.title}
                            imgLink={each.imgLink}
                            title={each.title}
                            desc={each.desc}
                            swap={index % 2 != 0}
                        />
                    );
                })}
            </div>
            <FAQ />
        </>
    );

    const loginModel = (
        <>
            <div className="login-model">
                <Fade>
                    <h1>
                        Sign In<p onClick={() => setmodel(false)}>x</p>
                    </h1>

                    <form onSubmit={LogingHandler}>
                        <input
                            className="email"
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                            className="password"
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setpassword(e.target.value)}
                        />
                        {AuthData.error ? (
                            <p className="error">
                                {ErrorCodes[AuthData.error.code]}
                            </p>
                        ) : null}
                        <button
                            className={AuthData.loading ? "disable" : ""}
                            type="submit"
                        >
                            {AuthData.loading ? <Spinner /> : "Sign In"}
                        </button>
                        {!AuthData.loading && (
                            <button onClick={demoLogin} className="demo-login">
                                Demo login
                            </button>
                        )}
                        <div className="lower">
                            <div className="checkbox">
                                <input
                                    type="checkbox"
                                    name="remember"
                                    value="remember"
                                />
                                <label>Remember me</label>
                            </div>
                            <p>Need help?</p>
                        </div>
                    </form>
                    <p className="new">
                        New to Netflix?{" "}
                        <span
                            className={AuthData.loading ? "disable" : ""}
                            onClick={() => SignUp()}
                        >
                            Sign up now
                        </span>
                    </p>
                </Fade>
            </div>
        </>
    );
    return (
        <Layout title="Netflix India" home>
            <div className="login">
                <img className="background" src="/website_large.jpg"></img>
                <div className="head">
                    <img className="logo" src="/NavLogo.png"></img>
                    <button className="sign_in" onClick={(e) => setmodel(true)}>
                        Sign In
                    </button>
                </div>
                {model ? loginModel : content}
            </div>
            {!model ? panelViews : null}
        </Layout>
    );
};

const mapStatetoProps = (state: ReducerStoreState) => {
    return {
        AuthData: state.Authdata,
    };
};

const mapDispacthtoProps = (dispatch: any) => {
    return {
        initializeAuth: (email, password, login) =>
            dispatch(UserActionList.InitializeAuth(email, password, login)),
    };
};
export default connect(mapStatetoProps, mapDispacthtoProps)(Home);
