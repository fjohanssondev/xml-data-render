export interface StartDepartment {
  DepartmentID: string[];
  DepartmentName: string[];
  Articles: Article[];
}

export interface Article {
  Article: ArticleDetails[];
}

export interface ArticleDetails {
  ArticleID: string[];
  Title: string[];
  PublishDate: string[];
  Text: Text[];
  RightMenu: RightMenu[];
}

export interface Text {
  Paragraph: string[];
}

export interface RightMenu {
  MenuItem: MenuItem[];
}

export interface MenuItem {
  _: string; // Menu item text
  $: {
    link: string; // URL for the link
  };
}
