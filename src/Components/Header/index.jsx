import { createStyles, Header} from '@mantine/core';
// comment

    const useStyles = createStyles((theme) => ({
        header: {
            backgroundColor: theme.fn.variant({ variant: 'filled', color: theme.primaryColor }).background,
            borderBottom: 0,
        }}));

    const MyHeader = () => {
        const { classes } = useStyles();
      
      return (
        <>
          <Header height={56} className={classes.header} mb={120}>
          <h1 color="gray.2" >To Do List</h1>
          </Header>
          </>
        );
        
    }
    export default MyHeader;