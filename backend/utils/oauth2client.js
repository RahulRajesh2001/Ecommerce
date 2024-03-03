import { google } from 'googleapis';

const GOOGLE_CLIENT_ID ="1059014681918-q61snoptndd2edig5ncioj0m9ivtb4qt.apps.googleusercontent.com"
const GOOGLE_CLIENT_SECRET ="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"

const oauth2Client = new google.auth.OAuth2(
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
);

export default oauth2Client