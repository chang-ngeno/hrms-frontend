import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Card, List, Button, Icon } from "semantic-ui-react";

export default function JobAdvertisementViewDetails(props) {
  const jobAdvertisement = props.jobAdvertisement;
  const [favorite, setFavorite] = useState(false);


  return (
    <>
      <Card fluid raised>
        <Card.Content>
          <Card.Header>{jobAdvertisement.position?.positionName}</Card.Header>
          <Card.Meta>
            <span style={{ color: "gray" }}>
              {jobAdvertisement.employer?.companyName}
            </span>{" "}
            - {jobAdvertisement.employer?.website}
          </Card.Meta>
          <Card.Description>{jobAdvertisement.description}</Card.Description>

          <List style={{ marginTop: "20px" }} fluid horizontal relaxed>
            <List.Item>
              <Icon name="location arrow" color="grey" />
              {jobAdvertisement.city?.cityName}
            </List.Item>
            <List.Item>
              <Icon name="clock" color="grey" />
              {jobAdvertisement.workingTime?.workingTimeName}
            </List.Item>
            <List.Item>
              <Icon name="money" color="grey" /> {jobAdvertisement.minSalary} -
              {jobAdvertisement.maxSalary}
            </List.Item>
            <List.Item>
              <Icon name="user" style={{ marginRight: "5px" }} color="grey" />
              {jobAdvertisement.openPositionsAmount} Kişi
            </List.Item>
            <List.Item>
              <Icon name="calendar alternate outline" color="grey" />
              {("" + jobAdvertisement.deadline).substring(0, 10)}
            </List.Item>
          </List>
        </Card.Content>
        <Card.Content extra>
          <div style={{ textAlign: "right" }}>
            <Button
              as={Link}
              to={`/account`}
              style={{ marginRight: "10px" }}
              basic
              color="green"
            >
              Başvur
            </Button>
            <Button
              onClick={() => {
                toast.info(
                  favorite
                    ? "İlan favorilerden başarıyla kaldırıldı."
                    : "İlan favorilere başarıyla eklendi",
                  { autoClose: 1200 }
                );
                setFavorite(!favorite);
              }}
              size="tiny"
              color={favorite === true ? "red" : "white"}
              circular
              icon="heart"
            />
          </div>
        </Card.Content>
      </Card>
    </>
  );
}
