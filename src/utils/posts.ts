export type Post = {
  data: {
    post_title: [{ text: string }];
    post_banner: {
      url: string;
      alt: string;
    };
    post_content: [{ text: string }];
    post_excerpt: [{ text: string }];
  };
  first_publication_date: string;
  last_publication_date: string;
  uid: string;
};

const Posts: Post[] = [
  {
    data: {
      post_title: [{ text: "Título do primeiro post" }],
      post_banner: {
        alt: "alternative text for post 1",
        url: "path-to-my-image-post1",
      },
      post_content: [
        {
          text:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ultrices eros in cursus turpis massa tincidunt dui ut ornare. Turpis massa tincidunt dui ut ornare lectus sit. At auctor urna nunc id. Amet nulla facilisi morbi tempus. Vel pharetra vel turpis nunc eget lorem. Sit amet purus gravida quis blandit turpis cursus in hac. Magna sit amet purus gravida quis blandit turpis cursus in. Libero nunc consequat interdum varius sit. Sed blandit libero volutpat sed cras ornare. Nunc non blandit massa enim. Arcu dictum varius duis at consectetur. Euismod lacinia at quis risus sed vulputate odio ut enim. Nullam ac tortor vitae purus. Proin nibh nisl condimentum id venenatis. Quis ipsum suspendisse ultrices gravida dictum fusce ut placerat. At elementum eu facilisis sed odio morbi quis commodo odio. Tristique senectus et netus et malesuada fame. Amet mauris commodo quis imperdiet massa tincidunt nunc pulvinar. Scelerisque fermentum dui faucibus in ornare quam viverra orci. Ultrices neque ornare aenean euismod elementum nisi. Rhoncus dolor purus non enim praesent elementum facilisis leo. Neque laoreet suspendisse interdum consectetur libero. Dignissim suspendisse in est ante. Duis tristique sollicitudin nibh sit amet. Gravida dictum fusce ut placerat. Lorem donec massa sapien faucibus et molestie ac. Lorem ipsum dolor sit amet consectetur adipiscing elit pellentesque habitant. Elementum eu facilisis sed odio morbi. Cras adipiscing enim eu turpis egestas pretium aenean pharetra magna. Convallis a cras semper auctor neque vitae tempus quam. Vitae purus faucibus ornare suspendisse sed nisi lacus sed. Commodo sed egestas egestas fringilla phasellus faucibus. Sodales neque sodales ut etiam. Turpis egestas integer eget aliquet nibh praesent tristique magna. Sed arcu non odio euismod lacinia at. Sed lectus vestibulum mattis ullamcorper velit sed ullamcorper. Varius vel pharetra vel turpis nunc eget lorem dolor. Quis ipsum suspendisse ultrices gravida. Sodales ut eu sem integer vitae. Habitant morbi tristique senectus et netus et malesuada fames. Feugiat sed lectus vestibulum mattis ullamcorper velit sed ullamcorper. Odio pellentesque diam volutpat commodo sed egestas egestas. Arcu vitae elementum curabitur vitae nunc sed velit. Ut lectus arcu bibendum at varius vel pharetra. Sit amet commodo nulla facilisi nullam vehicula ipsum. Nunc lobortis mattis aliquam faucibus purus in. Sit amet nisl suscipit adipiscing bibendum est. Amet commodo nulla facilisi nullam vehicula. Duis convallis convallis tellus id interdum velit laoreet id. Aliquet enim tortor at auctor urna nunc. Lorem sed risus ultricies tristique nulla aliquet enim tortor at.",
        },
      ],
      post_excerpt: [{ text: "excerpt do post1" }],
    },
    first_publication_date: "33333333",
    last_publication_date: "4444444",
    uid: "uid-do-meu-post",
  },
  {
    data: {
      post_title: [{ text: "Título do segundo post" }],
      post_banner: {
        url: "path-to-my-image",
        alt: "photo",
      },
      post_content: [{ text: "poqpweopwq" }],
      post_excerpt: [{ text: "Resumo" }],
    },
    first_publication_date: "11111",
    last_publication_date: "2222222",
    uid: "uid-do-meu-outro-post",
  },
];

export default Posts;
