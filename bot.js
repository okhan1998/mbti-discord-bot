const { token } = require('./config.json');
const { Client, Intents } = require('discord.js');
const Verify = require('./bot-verify'); 
const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    ]
})
const GUILD_ID = '972406976300593172';
const ROLE_VIP_ID = '972427150953168897'
const MEMBER_ID = '972407699130183700'
const CHANNEL_ID = '972406976300593175'

client.once('ready', async () => {
	console.log(`Ready!`);
    const guild = client.guilds.cache.get(GUILD_ID);
    const channel = guild.channels.cache.get(CHANNEL_ID);
    const role = guild.roles.cache.get(ROLE_VIP_ID);
    const member = await guild.members.fetch(MEMBER_ID);
    console.log('member', member);
    // member.roles.add(role);
    // member.roles.remove(role);
    // const ch_verify1 = channel;
    // const old_msg2 = await ch_verify1.messages.fetch();
    // ch_verify1.bulkDelete(old_msg2);
    channel.send('bot start');

    

    const ch_verify = guild.channels.cache.get(Verify.channel_id);
    const old_msg = await ch_verify.messages.fetch();
    ch_verify.bulkDelete(old_msg);

    Verify.ready(client);
    
});

client.on('messageReactionAdd', async (reaction, user) => {
    if(user.bot) return;
    if(reaction.message.partial) await reaction.message.fetch();
    if(reaction.partial) await reaction.fetch();
    if(!reaction.message.guild) return;

    if(reaction.message.channelId == Verify.channel_id){
        Verify.reaction(reaction, user);
    } else {
        console.error('messageReactionAdd no ch');
    }
})

// client.on('messageCreate', async (msg) => {
//     if(msg.author.bot) return;
//     console.log('msg.content', msg.content)
//     msg.reply('응~맞아')
// })

client.login(token);
console.log('login')

const ROLE_ID_NFT = '974205882445467688';
async function add_nft_role(user_id) {
    console.log('add_nft_role', user_id);

    const guild = client.guilds.cache.get(GUILD_ID);
    const role = guild.roles.cache.get(ROLE_ID_NFT);
    const member = await guild.members.fetch(user_id);
    member.roles.add(role);
}

module.exports = {
    add_nft_role, 
}