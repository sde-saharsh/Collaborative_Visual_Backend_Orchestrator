import React from "react"

interface MainLayoutProps {
    topBar: React.ReactNode
    sidebar: React.ReactNode
    inspector: React.ReactNode
    children: React.ReactNode
}

const MainLayout: React.FC<MainLayoutProps> = ({
    topBar,
    sidebar,
    inspector,
    children
}) => {
    return (
        <div className="flex flex-col h-screen w-screen overflow-hidden bg-white">
            {topBar}
            <div className="flex flex-1 overflow-hidden">
                {sidebar}
                <div className="flex flex-col flex-1 relative z-0">
                    {children}
                </div>
                {inspector}
            </div>
        </div>
    )
}

export default MainLayout
