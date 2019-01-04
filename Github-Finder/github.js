class GitHub {
  constructor() {
    this.client_id = '6815c71d9765d5811c24';
    this.client_secret = 'b46d91df8eeec045feca4fda1cf7d4b7e06ce31b';
    this.repos_count = 10;
    this.repos_sort = 'created: asc';
  }

  async getUser(user) {
    const profileResponse = await fetch(
      `https://api.github.com/users/${user}?client_id=${this.client_id}&client_secret=${
        this.client_secret
      }`,
    );
    const repoResponse = await fetch(
      `https://api.github.com/users/${user}/repos?per_page=${this.repos_count}&sort=${
        this.repos_sort
      }&client_id=${this.client_id}&client_secret=${this.client_secret}`,
    );

    const profileData = await profileResponse.json();
    const reposData = await repoResponse.json();

    return {
      profile: profileData,
      repos: reposData,
    };
  }
}
