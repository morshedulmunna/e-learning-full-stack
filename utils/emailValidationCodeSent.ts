import ejs from "ejs";
import path from "path";

export async function emailValidationCodeSent(data: any) {
    const html = await ejs.renderFile(
        path.join(
            __dirname,
            "../../../mails_template/activation-mail.ejs",
            data
        )
    );

    return html;
}
