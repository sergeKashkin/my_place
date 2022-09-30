export interface ILayoutService {
    isTouchScreenEnabled(): boolean;
    isMobileDevice(): boolean;
}
export class LayoutService implements ILayoutService {

    isTouchScreenEnabled(): boolean {
        try {
            document.createEvent('TouchEvent');
            return true;
        } 
        catch(e) {
            return false;
        }
    }

    isMobileDevice(): boolean {
        return window.innerWidth <= 768;
    }

}