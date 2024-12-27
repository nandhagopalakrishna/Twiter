# Twitter AI Reply Extension

A browser extension that adds AI-powered reply suggestions to Twitter using OpenAI's GPT model.

## Features

- Seamlessly integrates with Twitter's UI
- Generates contextually relevant replies
- Secure cloud-hosted backend
- Real-time reply generation
- Error handling and loading states

## Setup

1. Install dependencies:
```bash
npm install
```

2. Build the extension:
```bash
npm run build
```

3. Load the extension in Chrome:
- Open Chrome and go to `chrome://extensions/`
- Enable "Developer mode"
- Click "Load unpacked"
- Select the `dist` directory

## Usage

1. Navigate to Twitter
2. Click the reply button on any tweet
3. Click the "AI Reply" button next to the reply box
4. Edit the generated reply if needed
5. Post your reply

## Development

- `npm run dev` - Start development server
- `npm run build` - Build production version
- `npm run lint` - Run ESLint

## Security

The extension uses a secure cloud-hosted backend to keep your OpenAI API key safe. All API calls are made through the remote server, never exposing sensitive data in the browser.