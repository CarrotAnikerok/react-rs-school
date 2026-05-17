import { Outlet, type NavLinkRenderProps } from "react-router";
import { Navigation } from '../Navigation/Navigation';



export function Layout() {
    const style = ({ isActive }: NavLinkRenderProps) => {
        return isActive ? "active" : ""
    };

    return (
        <>
            <Navigation style={style}></Navigation>
            <main>
                <Outlet />
            </main>
        </>
    )
}