/* eslint-disable @typescript-eslint/no-explicit-any */
import fetch from "node-fetch";

export interface InstagramFeedType {
  alt: string;
  url: string;
  src: string;
}

const getThumbnailIndex = (node: any): number => {
  node.thumbnail_resources.forEach((item: any, index: number) => {
    if (item.config_width === 640) {
      return index;
    }
  });
  return 4;
};

const getUrl = (node: any): string => {
  return "https://www.instagram.com/p/" + node.shortcode;
};

const getSrc = (node: any): string => {
  switch (node.__typename) {
    case "GraphSidecar":
      return node.thumbnail_resources[getThumbnailIndex(node)].src;
    case "GraphVideo":
      return node.thumbnail_src;
    default:
      return node.thumbnail_resources[getThumbnailIndex(node)].src;
  }
};

const getAlt = (node: any): string => {
  if (node?.edge_media_to_caption?.edges[0]?.node) {
    return node.edge_media_to_caption.edges[0].node.text;
  } else if (node.accessibility_caption) {
    return node.accessibility_caption;
  }

  return "";
};

const mapInstagramFeed = (json: any): Array<InstagramFeedType> => {
  const edges =
    json?.entry_data?.ProfilePage[0]?.graphql?.user
      ?.edge_owner_to_timeline_media?.edges || [];

  return edges.map((edge: any) => {
    return {
      alt: getAlt(edge.node),
      url: getUrl(edge.node),
      src: getSrc(edge.node),
    };
  });
};
const parseInstagramJson = (body: string): string => {
  try {
    const data = body.split("window._sharedData = ")[1].split("</script>")[0];
    return JSON.parse(data.substr(0, data.length - 1));
  } catch (err) {
    throw Error("Cannot parse response body");
  }
};
const getInstagramFeed = (
  userName: string
): Promise<Array<InstagramFeedType>> => {
  const url = "https://www.instagram.com/" + userName + "/";

  return fetch(url)
    .then((resp) => resp.text())
    .then((body) => parseInstagramJson(body))
    .then((json) => mapInstagramFeed(json));
};
export default getInstagramFeed;
