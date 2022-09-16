import Logo from "../../logo.svg";
import "./navbar.css";

const Navbar = () => {
    return (
        <div className="navbar">
            <div >
                <img src={Logo} alt="logo" height="40px" />
            </div>
            <div className="nav-links">
                <a>Sign In</a>
                <a className="button">SmallCase for PC</a>
            </div>
        </div>
    );
};

export default Navbar;