import { BsFill1SquareFill, BsFillHouseGearFill, BsFillChatRightTextFill, BsYinYang, BsFillDatabaseFill, BsFillCheckSquareFill, BsKey } from "react-icons/bs";
import * as randomstring from "randomstring";


const ListMenu = [
    {
        key: randomstring.generate(100).toUpperCase(),
        title: "Home",
        href: '/index',
        ico: <BsFillHouseGearFill color="white" fontSize="1.5em" />,
        mode: 0,
    },
    {
        key: randomstring.generate(100).toUpperCase(),
        title: "Login",
        href: '/login',
        ico: <BsKey color="white" fontSize="1.5em" />,
        mode: 1,
    },
    {
        key: randomstring.generate(100).toUpperCase(),
        title: "Register Mode",
        href: '/Kla',
        ico: <BsFillCheckSquareFill color="white" fontSize="1.5em" />,
        mode: 0,
    }
    ,
    {
        key: randomstring.generate(100).toUpperCase(),
        title: "Register Items",
        href: '/RegisterItems',
        ico: <BsFillDatabaseFill color="white" fontSize="1.5em" />,
        mode: 0,
    }

    ,
    {
        key: randomstring.generate(100).toUpperCase(),
        title: "Complaint List",
        href: './ComplaintList',
        ico: <BsYinYang color="white" fontSize="1.5em" />,
        mode: 0,
    }







];
export default ListMenu;