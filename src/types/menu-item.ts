/**
 * Header 네비게이션 메뉴 아이템 타입
 */
export interface MenuItem {
  name: string;
  href?: string;
  submenu?: MenuItem[];
}
