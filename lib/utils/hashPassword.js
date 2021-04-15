import crypto from "crypto";

export default (password) => crypto.createHash("sha256").update(password).digest("hex");
