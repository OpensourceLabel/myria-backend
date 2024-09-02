import { genSaltSync, hashSync } from "bcrypt";

export default {
    AdminSys: {
        fullname: `Administateur`,
        email: `admin@exemple.com`,
        role: `ADMIN`,
        username: `admin@exemple.com`,
        password: hashSync(`2298`, genSaltSync(10))
    }
}