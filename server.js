const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const TelegramBot = require('node-telegram-bot-api');

const app = express();
app.use(bodyParser.json());
app.use(express.static('public')); // Static files

const botToken = '7489104395:AAG4fcBvkqzi9fN9w_cqBXYaPxTBQ0nt1qI'; // আপনার টেলিগ্রাম বট API টোকেন
const bot = new TelegramBot(botToken, { polling: true });

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/yourdbname', { useNewUrlParser: true, useUnifiedTopology: true });

const userSchema = new mongoose.Schema({
    username: String,
    userId: String,
    balance: Number,
});

const User = mongoose.model('User', userSchema);

// API to get user info
app.get('/user/:userId', async (req, res) => {
    const user = await User.findOne({ userId: req.params.userId });
    if (user) {
        res.json({ username: user.username, balance: user.balance });
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});

// Telegram bot command to start and register user
bot.onText(/\/start (.+)/, async (msg, match) => {
    const chatId = msg.chat.id;
    const userId = match[1]; // ইউজার আইডি এখানে থাকবে
    const username = msg.from.username;

    await User.findOneAndUpdate(
        { userId: userId.toString() },
        { username, userId: userId.toString(), balance: 100 }, // ডিফল্ট ব্যালেন্স
        { upsert: true }
    );

    bot.sendMessage(chatId, `Welcome, ${username}! Your data is being processed.`);
});

// Start the server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
