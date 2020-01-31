const authors = [
	{
		id: 'santosh-bhandari',
		name: 'Santosh Bhandari',
		introduction: 'Programmer, developer and gamer interested in learning something new and improve myself everyday, also love to help others!',
		img: 'santosh-bhandari.jpg',
		social: {
			website: 'https://santoshb.com.np',
			github: 'https://github.com/TheLearneer'
		}
	}
]

export default {
	getDetails(id) {
		return authors.find(author => id.toLowerCase() === author.id.toLowerCase());
	}
}