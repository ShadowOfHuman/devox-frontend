import React from "react";
import Button from "@material-ui/core/Button";
import {
    Table,
    TableHead,
    TableRow,
    TableBody,
    TableCell
} from "@material-ui/core";

const styles = {
    table: {
        borderRadius: 4,
        marginTop: 30,
        marginLeft: 50,
        marginRight: 50,
        minWidth: 120
    }
};
export class GamesPreview extends React.Component {
    render() {
        let header = [
            <TableHead>
                <TableRow>
                    <TableCell>Server</TableCell>
                    <TableCell>Host</TableCell>
                    <TableCell>Size</TableCell>
                    <TableCell>Password</TableCell>
                    <TableCell>        </TableCell>
                </TableRow>
            </TableHead>
        ];
        let items = [];
        for (let i = 0; i < this.props.games.length; i++) {
            items.push(
                <TableRow>
                    <TableCell>{this.props.games[i].name}</TableCell>
                    <TableCell>{this.props.games[i].host}</TableCell>
                    <TableCell>{this.props.games[i].size}</TableCell>
                    <TableCell>{this.props.games[i].password}</TableCell>
                    <TableCell>
                        <Button
                            align="right"
                            variant="contained"
                            color="primary"
                            onClick={() => this.props.clickHandler(this.props.games[i].gameId, this.props.games[i].userId)}
                        >
                            Connect
                        </Button>
                    </TableCell>
                </TableRow>
            );
        }
        return (
            <Table style={styles.table} aria-label="simple table">
                {header}
                <TableBody>{items}</TableBody>
            </Table>
        );
    }
}
