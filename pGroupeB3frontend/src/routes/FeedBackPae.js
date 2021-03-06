import { mdiFileDocument, mdiFormatListChecks } from "@mdi/js";
import React from "react";
import Header from "../components/Hearder";
import Button from "../components/Button";
import Loading from "../components/Loading";
import { Filled } from "../components/Styles";
import { FindSectionById } from "../services/SectionService";
import {
    FindStudentById,
    GetBlocForStudent,
} from "../services/StudentsService";
import { GeneratePAE, PAEDisplay } from "../services/GeneratePaePdfService";

export default class FeedBackPae extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            student: undefined,
            section: undefined,
        };
    }

    componentDidMount() {
        const id = this.props.match.params.studentId;
        FindStudentById(id).then((student) => {
            this.setState({
                student: student,
            });
            FindSectionById(student.bloc.substr(0, 2)).then((section) => {
                this.setState({
                    section: section,
                });
            });
        });
    }

    render() {
        if (
            this.state.student === undefined ||
            this.state.section === undefined
        ) {
            return <Loading />;
        }
        return (
            <div className="flex-1">
                <Header
                    icon={mdiFormatListChecks}
                    title={
                        this.state.student.firstname +
                        " " +
                        this.state.student.lastname
                    }
                    description={
                        "Bachelier en " +
                        this.state.section.name.toLowerCase() +
                        " · " +
                        GetBlocForStudent(this.state.student).toUpperCase()
                    }
                >
                    <Button
                        variante={Filled}
                        text="Télécharger"
                        icon={mdiFileDocument}
                        onClick={() =>
                            GeneratePAE(this.state.student, this.state.section)
                        }
                    />
                </Header>

                {/* Display all ues et aas */}
                <div className="relative max-w-2xl mx-auto flex flex-col  gap-2">
                    <PAEDisplay
                        student={this.state.student}
                        section={this.state.section}
                    />
                </div>
            </div>
        );
    }
}
