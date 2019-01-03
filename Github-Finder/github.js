class GitHub {
  constructor() {
    this.client_id = '6815c71d9765d5811c24';
    this.client_secret = 'b46d91df8eeec045feca4fda1cf7d4b7e06ce31b';
  }

  async getUser(user) {
    const profileResponse = await fetch(
      `https://api.github.com/users/${user}?client_id=${this.client_id}&client_secret=${
        this.client_secret
      }`,
    );

    const profileData = await profileResponse.json();

    return {
      profile: profileData,
    };
  }
}
