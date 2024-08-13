import { Box, Chip, Stack, Typography } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import { useAppSelector } from "../../app/hooks";
import { selectSelectedRepo } from "../../features/repository/repositoriesSlice";
import s from "./RepoDetails.module.sass";

const RepoDetails = () => {
  const selectedRepo = useAppSelector(selectSelectedRepo);

  return selectedRepo ? (
    <Box className={s.details}>
      <Typography variant="h4" className={s.name}>
        {selectedRepo.name}
      </Typography>

      <Stack direction={"row"} className={s.content}>
        {(selectedRepo.language && (
          <Chip label={selectedRepo.language} color="primary" />
        )) || <Box></Box>}

        <Stack spacing={1} direction={"row"}>
          <StarIcon htmlColor="#ffb400" />
          <Typography>{selectedRepo.stars}</Typography>
        </Stack>
      </Stack>

      <Typography variant="body1" className={s.description}>
        {selectedRepo.description}
      </Typography>

      <Typography variant="subtitle2" className={s.lisence}>
        {selectedRepo.license}
      </Typography>
    </Box>
  ) : (
    <Stack className={s.empty}>
      <Typography variant="subtitle2">Выберите репозиторий</Typography>
    </Stack>
  );
};

export default RepoDetails;
