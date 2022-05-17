const { MessageEmbed } = require('discord.js');

const ROLE_VIP_ID = '972427150953168897'
const CH_VERIFY = '972451169253359637'
const EMOJI = "✅"

async function ready(client){
    const ch = await client.channels.fetch(CH_VERIFY);

    const embed = new MessageEmbed()
    .setTitle('안녕하세요')
    .setDescription(`${EMOJI} 눌러 가입하세요`);

    ch.send({ embeds: [embed]}).then((msg) => {
        console.log('verify send ok');
        msg.react(EMOJI)
    })

    const embed2 = new MessageEmbed()
        .setTitle('여기를 눌러 지갑을 연동하기')
        .setDescription(`위에 문구를 눌러서 지갑을 연동하세요`)
        .setURL('https://discord.com/api/oauth2/authorize?client_id=972061571868131428&redirect_uri=http%3A%2F%2Flocalhost%3A53134&response_type=code&scope=identify');
    ch.send({ embeds: [embed2] }).then(() => {});

}

async function reaction(reaction, user){
    if(reaction.emoji.name == EMOJI) {
        console.log('messageReactionAdd ok', EMOJI);
        const guild = reaction.message.guild;
        const role = guild.roles.cache.get(ROLE_VIP_ID);
        const member = guild.members.cache.get(user.id);
        await member.roles.add(role);

    } else {
        console.log('messageReactionAdd unknown emoji')
    }
}

module.exports = { 
    channel_id : CH_VERIFY,
    ready,
    reaction,
}