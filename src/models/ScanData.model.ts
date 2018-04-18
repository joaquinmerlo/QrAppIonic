export class ScanData {
    info: string;
    type: string;
    date: string;
    time: string;

    constructor(text: string) {
        this.type = "Undefined";
        if (text.startsWith('http')) {
            this.type = "http";
        } else if (text.startsWith('geo')) {
            this.type = "geo";
        } else if (text.startsWith('BEGIN:VCARD')) {
            this.type = "vcard";
        }else if (text.startsWith('MATMSG')) {
            this.type = "email";
        }
        this.info = text;
        this.date = new Date().toLocaleDateString();
        this.time = new Date().toLocaleTimeString();
    }
}