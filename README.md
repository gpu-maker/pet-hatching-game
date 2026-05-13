# 🐣 Pet Hatching Game - Multiplayer Edition

A real-time multiplayer egg hatching and pet trading game where players from different devices can join the same server, hatch rare pets, trade with each other, and show off their collections!

## 🎮 Features

### Core Gameplay
- **Player Accounts**: Create accounts and maintain persistent profiles
- **Egg Hatching**: Collect and hatch 6 different egg types (Starter, Forest, Ocean, Crystal, Void, Celestial)
- **Pet Rarity System**: 12 rarity tiers from Common to Transcendent
- **Pet Mutations**: Mutate pets into Golden, Rainbow, Shadow, Corrupted, Galactic variants
- **Pet Leveling**: Feed pets, earn XP, and level up
- **Hunger & Happiness**: Dynamic pet care system

### Multiplayer Features
- **Real-Time Movement**: See other players walking around the plaza
- **Live Trading System**: Trade pets and coins with real players instantly
- **Global Chat**: Communicate with all online players
- **Friend System**: Add and manage friends
- **Leaderboards**: Compete on global rankings
- **Online Player List**: See who's playing
- **Server Announcements**: Get notified when rare pets are hatched

### Security & Anti-Cheat
- **Server-Side Validation**: All inventory changes validated on backend
- **Anti-Duplication**: Prevent item duplication exploits
- **Secure Authentication**: JWT-based login system
- **Trade Logs**: All trades recorded server-side
- **Rate Limiting**: Protection against abuse
- **Reconnect Support**: Resume where you left off

### World & Buildings
- **Shared Plaza**: Central hub where all players gather
- **Egg Shop**: Purchase eggs with coins
- **Trading Center**: Dedicated trading area
- **Leaderboard Area**: View rankings
- **Floating Usernames**: See player names above characters
- **Animated Pets**: Pets follow players around

## 🛠️ Tech Stack

- **Frontend**: HTML, CSS, JavaScript (vanilla)
- **Backend**: Node.js with Express
- **Real-Time**: Socket.IO
- **Database**: MongoDB (or SQLite for simple setup)
- **Authentication**: JWT tokens
- **Deployment**: VPS/Cloud ready

## 📋 Prerequisites

- Node.js >= 14.0.0
- MongoDB or SQLite
- npm or yarn
- A modern web browser

## 🚀 Quick Start

### 1. Clone & Install
```bash
git clone https://github.com/gpu-maker/pet-hatching-game.git
cd pet-hatching-game
npm install
```

### 2. Configure Environment
```bash
cp .env.example .env
# Edit .env with your settings
```

### 3. Start Development Server
```bash
npm run dev
# or production: npm start
```

### 4. Open in Browser
```
http://localhost:3000
```

## 📁 Project Structure

```
pet-hatching-game/
├── backend/
│   ├── server.js                 # Main server entry
│   ├── config.js                 # Configuration loader
│   ├── models/
│   │   ├── User.js               # Player account schema
│   │   ├── Pet.js                # Pet data schema
│   │   ├── Trade.js              # Trade history schema
│   │   └── Chat.js               # Chat message schema
│   ├── routes/
│   │   ├── auth.js               # Authentication endpoints
│   │   ├── users.js              # Player endpoints
│   │   ├── pets.js               # Pet endpoints
│   │   └── trades.js             # Trading endpoints
│   ├── middleware/
│   │   ├── auth.js               # JWT verification
│   │   └── validation.js         # Input validation
│   ├── utils/
│   │   ├── socket-handlers.js    # Real-time event handlers
│   │   ├── game-engine.js        # Game logic
│   │   ├── pet-generator.js      # Pet creation/hatching
│   │   └── constants.js          # Game constants
│   └── events/
│       ├── multiplayer.js        # Movement, chat, etc.
│       ├── trading.js            # Trading events
│       └── notifications.js      # Server announcements
├── frontend/
│   ├── index.html                # Main HTML file
│   ├── css/
│   │   ├── style.css             # Main styles
│   │   ├── animations.css        # Pet animations
│   │   └── responsive.css        # Mobile responsive
│   └── js/
│       ├── main.js               # App initialization
│       ├── game.js               # Game state manager
│       ├── multiplayer.js        # Socket.IO client
│       ├── trading.js            # Trading system
│       ├── ui.js                 # UI controllers
│       ├── renderer.js           # Canvas rendering
│       └── constants.js          # Game constants
├── package.json
├── .env.example
├── .gitignore
└── README.md
```

## 🎮 Game Systems

### Egg Types
| Type | Rarity | Cost |
|------|--------|------|
| Starter Egg | Common | 100 coins |
| Forest Egg | Uncommon-Rare | 250 coins |
| Ocean Egg | Rare-Epic | 500 coins |
| Crystal Egg | Epic-Legendary | 1000 coins |
| Void Egg | Legendary-Mythic | 2000 coins |
| Celestial Egg | Mythic-Divine | 5000 coins |

### Rarity Tiers
1. Common (10%)
2. Uncommon (15%)
3. Rare (20%)
4. Elite (15%)
5. Epic (12%)
6. Legendary (10%)
7. Mythic (7%)
8. Ancient (5%)
9. Divine (3%)
10. Secret (2%)
11. Transcendent (0.8%)
12. Impossible (0.2%)

### Pet Mutations
- **Golden**: Increased coin generation
- **Rainbow**: Increased happiness
- **Shadow**: Increased rarity potential
- **Corrupted**: Increased XP gain
- **Galactic**: Special effects and animations

### Food Shop
- Apple (10 coins)
- Bread (20 coins)
- Fish (30 coins)
- Cake (50 coins)
- Golden Treat (100 coins)
- Cosmic Snack (250 coins)
- Divine Fruit (500 coins)

## 🔒 Security Features

- **Server-Side Validation**: All trades and inventory changes validated
- **JWT Authentication**: Secure token-based login
- **Password Hashing**: bcryptjs for password security
- **CORS Protection**: Cross-origin request filtering
- **Rate Limiting**: DDoS protection
- **Input Sanitization**: XSS prevention
- **Trade Confirmation**: 2-step trade confirmation
- **Anti-Scam Checks**: Verify items before trade completion

## 🌐 Deployment

### VPS (Ubuntu/Debian)
```bash
# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install MongoDB
sudo apt-get install -y mongodb

# Clone and setup
git clone https://github.com/gpu-maker/pet-hatching-game.git
cd pet-hatching-game
npm install
cp .env.example .env
# Edit .env with production settings

# Start with PM2
npm install -g pm2
pm2 start backend/server.js --name "pet-game"
pm2 startup
pm2 save
```

### Heroku
```bash
heroku create your-app-name
heroku addons:create mongolab:sandbox
git push heroku main
```

### Docker (Optional)
```bash
docker build -t pet-hatching-game .
docker run -p 3000:3000 pet-hatching-game
```

## 🎯 Roadmap

- [ ] Guild/Clan system
- [ ] Pet fusion mechanics
- [ ] Mini-games for bonus coins
- [ ] Auction house
- [ ] Trading marketplace
- [ ] Daily rewards
- [ ] Event eggs with seasonal pets
- [ ] Cross-server chat
- [ ] Pet breeding
- [ ] Battle system

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 API Documentation

### Authentication
- `POST /api/auth/register` - Create new account
- `POST /api/auth/login` - Login to account
- `POST /api/auth/logout` - Logout

### Players
- `GET /api/players/:id` - Get player info
- `GET /api/players/leaderboard` - Get rankings
- `PUT /api/players/:id` - Update profile

### Pets
- `GET /api/pets/:playerId` - Get player's pets
- `POST /api/pets/:playerId/hatch` - Hatch egg
- `PUT /api/pets/:id` - Update pet

### Trading
- `POST /api/trades` - Create trade request
- `PUT /api/trades/:id/accept` - Accept trade
- `PUT /api/trades/:id/decline` - Decline trade

## 🐛 Known Issues & Fixes

### Connection Issues
- Ensure Socket.IO is properly configured in `.env`
- Check CORS settings match your frontend URL

### Database Errors
- Verify MongoDB connection string
- Check database user permissions

### Performance
- Implement database indexing on frequently queried fields
- Use Redis for session caching (optional)
- Implement pagination for leaderboards

## 📄 License

MIT License - see LICENSE file for details

## 👥 Author

Created by gpu-maker

## 🆘 Support

For issues and questions:
1. Check existing GitHub issues
2. Create a new issue with detailed description
3. Join our Discord (link here)

## 🎉 Credits

Special thanks to the Socket.IO and Express.js communities!

---

**Happy gaming! 🎮**
