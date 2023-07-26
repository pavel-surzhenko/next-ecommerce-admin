import Nav from '../components/Nav';

const SettingsLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <Nav />
            <div className=' flex-grow  p-4 '>{children}</div>
        </>
    );
};
export default SettingsLayout;
